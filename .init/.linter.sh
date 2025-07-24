#!/bin/bash
cd /tmp/kavia/workspace/code-generation/tic-tac-toe-score-keeper-629930-629939/react_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

