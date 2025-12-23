#!/usr/bin/env bash
# see https://github.com/kvz/bash3boilerplate

# Exit on error. Append "|| true" if you expect an error.
set -o errexit

# Exit on error inside any functions or subshells.
set -o errtrace

# Do not allow use of undefined vars. Use ${VAR:-} to use an undefined VAR
set -o nounset

# Catch the error in case mysqldump fails (but gzip succeeds) in `mysqldump |gzip`
set -o pipefail

# Turn on traces, useful while debugging but commented out by default
# set -o xtrace

# Set magic variables for current file, directory, os, etc.
__dir="$(cd "$(dirname "${BASH_SOURCE[${__b3bp_tmp_source_idx:-0}]}")" && pwd)"
__file="${__dir}/$(basename "${BASH_SOURCE[${__b3bp_tmp_source_idx:-0}]}")"
__base="$(basename "${__file}" .sh)"

precommit_config_file=$(echo "${1?}" | cut -d "=" -f2)
precommit_check_all_files=$(echo "${2?}" | cut -d "=" -f2)

echo "::group::Run pre-commit checks"
pre_commit_path=$(command -v pre-commit 2>/dev/null) || true
if [[ "${pre_commit_path}" != "" ]]; then
  echo "pre-commit found in path at [${pre_commit_path}]"
else
  echo "Could not find pre-commit"
  echo "::error title=Run pre-commit checks::Please setup pre-commit through mise"
  exit 1
fi

echo "[DEBUG] Running precommit with precommit_check_all_files [${precommit_check_all_files}] and precommit_config_file [${precommit_config_file}]"

declare -a precommit_args=()
if [[ "${precommit_check_all_files}" == "true" ]]; then
  precommit_args+=("--all-files")
fi
# shellcheck disable=SC2068
"${pre_commit_path}" run --config "${precommit_config_file}" --show-diff-on-failure ${precommit_args[@]}

echo "::endgroup::"
