#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { AlegraSoccerTeamStack } from '../lib/alegra-soccer-team-stack';

const app = new cdk.App();
new AlegraSoccerTeamStack(app, 'AlegraSoccerTeamStack');
