FROM python:3.10-slim

RUN apt-get update && apt install -y command-not-found
RUN apt-file update
RUN update-command-not-found

# RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone
# RUN apt-get update && apt-get install -yq dpkg-reconfigure
# tzdata && dpkg-reconfigure -f noninteractive tzdata

RUN apt-get update && apt-get install -yq --no-install-recommends 
# \ openssh-server screen libsasl2-dev python-dev libldap2-dev libssl-dev python3-dev ldap-utils tox lcov valgrind

COPY ./requirements.txt /requirements.txt
COPY ./404custom.html /technical_404.html
RUN pip install --upgrade pip
RUN pip install --no-cache-dir -r /requirements.txt 


RUN mkdir /PROJECT

WORKDIR /PROJECT

COPY ./* /PROJECT/

COPY ./compose/custom404 /custom404
RUN sed -i 's/\r$//g' /custom404
RUN chmod +x /custom404

COPY ./compose/startserver /startserver
RUN sed -i 's/\r$//g' /startserver
RUN chmod +x /startserver

# COPY ./compose/createadmin /createadmin
# RUN sed -i 's/\r$//g' /createadmin
# RUN chmod +x /createadmin

# COPY ./compose/install /install
# RUN sed -i 's/\r$//g' /install
# RUN chmod +x /install


EXPOSE 5085

CMD ["/startserver"]