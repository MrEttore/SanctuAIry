#!/usr/bin/env sh
set -e

envsubst '\
  $LLM_MANAGER_HOST $LLM_MANAGER_PORT \
  $LLM_CORE_HOST    $LLM_CORE_PORT    \
  $EVIDENCE_PROVIDER_HOST $EVIDENCE_PROVIDER_PORT \
  $API_HOST' \
  </etc/nginx/conf.d/default.conf.tmpl \
  >/etc/nginx/conf.d/default.conf

exec nginx -g 'daemon off;'
