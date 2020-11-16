#!/bin/bash -x
if [[ ! "$#" -eq "2" ]]; then
  echo "$(basename "$0") <zone> <environment>"
  exit 1
fi

# Create keys/certs for everything
mkdir -p /etc/ssl/control_center
for i in nginx node_exporter chaos_monkey consul prometheus percona grafana jenkins; do
  cd /etc/ssl/control_center

  rm -Rf server.*
  rm -Rf extensions.conf

  cat <<-EOF > extensions.conf
    [req]
    req_extensions=v3_req
    distinguished_name      = req_distinguished_name

    [ req_distinguished_name]

    [ v3_req ]
    # Extensions to add to a certificate request
    basicConstraints = CA:FALSE
    keyUsage = nonRepudiation, digitalSignature, keyEncipherment
    subjectAltName = DNS:${i},DNS:${i}.eu2prd.taulia.com
EOF
  openssl genrsa -out ${i}.key 2048
  openssl req -newkey rsa:2048 -sha256 -nodes -keyout ${i}.key -out ${i}.csr -subj "/O=taulia/OU=zone_${1}/OU=${2}/OU=server/CN=${i}" -config extensions.conf
  openssl x509 -req -sha256 -days 1825 -in ${i}.csr -out ${i}.crt -CA $CA_CERT_PATH -CAkey $CA_KEY_PATH -extfile extensions.conf -extensions v3_req -CAcreateserial
  rm -Rf ${i}.csr extensions.conf
done
chcon -R system_u:object_r:cert_t:s0 /etc/ssl/control_center

