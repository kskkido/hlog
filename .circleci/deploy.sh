#!/usr/bin/env bash
#
# Deploy project in the specified stage ("staging").
# USAGE:
#     CIRCLECI=1 ./deploy.sh environment region

function main() {
  STAGE="production"
  REGION="ap-northeast-1"
  BUCKET_NAME="kskkido-hlog"

  unset AWS_ACCESS_KEY_ID
  unset AWS_SECRET_ACCESS_KEY
  export AWS_SDK_LOAD_CONFIG=1
  export AWS_PROFILE="deploy-${REGION}-${STAGE}"

  create_bucket ${BUCKET_NAME}
  deploy ${BUCKET_NAME}
}

function create_bucket() {
  BUCKET_NAME=${1:?"Bucket name required"}
  BUCKET="s3://${BUCKET_NAME}"
  STATUS=$(aws s3api head-bucket --bucket "${BUCKET_NAME}" 2>&1)

  if echo "${STATUS}" | grep 'Not Found';
  then
    echo "Creating S3 bucket: ${BUCKET}"
    aws s3 mb ${BUCKET} || exit
    echo "Created S3 bucket: ${BUCKET}"
  elif echo "${STATUS}" | grep -e 'Forbidden' -e 'Bad Request';
  then
    echo "${STATUS}"
    exit 1
  else
    echo "Bucket exists: ${BUCKET}";
  fi
}

function deploy() {
  BUCKET_NAME=${1:?"Bucket name required"}
  BUCKET="s3://${BUCKET_NAME}"

  aws s3 sync ./_site ${BUCKET}
  aws s3 website ${BUCKET} --index-document index.html
}

if [[ ${CIRCLECI} ]]; then
  main $*
else
  echo "Only to be run inside CircleCI"
  exit 1
fi

