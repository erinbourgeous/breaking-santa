#!/bin/bash -x
if [[ ! "$#" -eq "2" ]]; then
  echo "$(basename "$0") <zone> <environment>"
  exit 1
fi

rm -Rf /etc/ssl/ca
rm -Rf ca
mkdir ca
openssl req -new -newkey rsa:2048 -nodes -subj "/O=taulia/OU=zone_${1}/OU=${2}/CN=${2}rootca/" -keyout ca/ca.key > ca/ca.csr
openssl x509 -req -days 3650 -in ca/ca.csr -signkey ca/ca.key -out ca/ca.pem

mv ca /etc/ssl
chcon -R system_u:object_r:cert_t:s0 /etc/ssl/ca

