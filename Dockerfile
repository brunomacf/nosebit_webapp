FROM mhart/alpine-node:7
MAINTAINER Nosebit Dev Team <dev@nosebit.com>

# Install dev dependencies
RUN build_pkgs="gcc g++ python git openssh openssl ca-certificates" && \
    run_pkgs="make bash" && \
    apk --update add ${run_pkgs} ${build_pkgs}

# Set working directory
WORKDIR /home/webapp

# Move code to container
ADD . ./

# Add ssh keys (to clone repos via npm)
RUN mv ./.ssh /root/ && \
    eval "$(ssh-agent -s)" && \
    ssh-add /root/.ssh/id_rsa && \
    ssh-keyscan -H bitbucket.org >> /root/.ssh/known_hosts

# Install npm global dependencies
RUN npm install -g gulp-cli

# Install npm local dependencies
RUN npm install

# The main entrypoint
ENTRYPOINT ["make"]

# The main command of this container (can be overrided by clients)
CMD ["prod"]
