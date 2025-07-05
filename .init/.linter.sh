#!/bin/bash
cd /home/kavia/workspace/code-generation/themegenie-107565-597cd14a/theme_creator_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

