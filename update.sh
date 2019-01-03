#!/bin/bash
set -e

if ! [ "$TRAVIS_BRANCH" == "master" ] || ! [ "$TRAVIS_PULL_REQUEST" == "false" ]; then
	echo "Version is only bumped on master"
	exit 0
fi

lastVersion=$(git describe --abbrev=0)
versionRegex='^v([0-9]+)\.([0-9]+)\.([0-9]+)$'
if ! [[ $lastVersion =~ $versionRegex ]]; then
	echo $lastVersion "is not a valid semver string"
	exit 1
fi

majorVersion=${BASH_REMATCH[1]}
minorVersion=${BASH_REMATCH[2]}
patchVersion=${BASH_REMATCH[3]}

lastLogMessage=$(git log -1 --pretty=format:%s%b)
lastLogMessageShort=$(git log -1 --pretty=format:%s)

majorRegex='\[increment major\]'
patchRegex='\[increment patch\]'
if [[ $lastLogMessage =~ $majorRegex ]]; then
	majorVersion=$((majorVersion + 1))
	minorVersion=0
	patchVersion=0
elif [[ $lastLogMessage =~ $patchRegex ]]; then
	patchVersion=$((patchVersion + 1))
else
	minorVersion=$((minorVersion + 1))
	patchVersion=0
fi

newVersion="${majorVersion}.${minorVersion}.${patchVersion}"

# Add the upstream using GITHUB_RELEASE_TOKEN
echo 'Release token'
echo ${GITHUB_RELEASE_TOKEN}

git remote add upstream "https://${GITHUB_RELEASE_TOKEN}@github.com/Brightspace/d2l-telemetry-browser-client.git"

# Pull the merge commit
git pull upstream master
git checkout upstream/master

# Set config so this commit shows up as coming from Travis
git config --global user.email "travis@travis-ci.com"
git config --global user.name "Travis CI"

echo "Updating from ${lastVersion} to v${newVersion}"
sed -i "s/\"version\": \".*\"/\"version\": \""$newVersion"\"/" package.json

# Add the updated d2l-telemetry-browser-client.html, and add a new tag to create the release
git add .
git commit -m "[skip ci] Update to v${newVersion}"

echo "About to tag new version"
git tag -a v${newVersion} -m "v${newVersion} - ${lastLogMessageShort}"

echo "push new tag"
git push upstream HEAD:master --tags
