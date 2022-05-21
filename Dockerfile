FROM node:14-alpine3.14
RUN apk --no-cache add binutils-gold curl gcc g++ git gmp-dev ncurses-dev ncurses-static libffi-dev make xz tar perl zlib-dev zlib-static bash sudo
RUN mkdir -p ~/.ghcup/bin && curl https://downloads.haskell.org/~ghcup/x86_64-linux-ghcup > ~/.ghcup/bin/ghcup && chmod +x ~/.ghcup/bin/ghcup
ENV PATH="/root/.cabal/bin:/root/.ghcup/bin:$PATH"
RUN ghcup install ghc 9.0.2
RUN ghcup set ghc 9.0.2
RUN ghcup install cabal
RUN curl -sSLo /usr/local/bin/stack https://github.com/commercialhaskell/stack/releases/download/v2.7.3/stack-2.7.3-linux-x86_64-bin && \
    chmod +x /usr/local/bin/stack
RUN ln -s /usr/lib/libncursesw.so.6 /usr/lib/libtinfo.so.6 && \
    stack config set system-ghc --global true

