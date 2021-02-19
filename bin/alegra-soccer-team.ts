#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "@aws-cdk/core";
import * as dotenv from "dotenv";
import { DynamoStack } from "../lib/dynamo-stack";
import { ApiStack } from "../lib/api-stack";
import { LambdaStack } from "../lib/lambda-stack";

dotenv.config();

const app = new cdk.App();

const appName = "alegra-soccer-team";

const env = app.node.tryGetContext("env");

if (["test", "prod"].indexOf(env) === -1) {
  throw Error("Env not supported");
}

const sharedProps = {
  env: env,
  account: process.env.AWS_ACCOUNT_ID || "",
  region: process.env.AWS_ACCOUNT_REGION || "",
};

const dynamoStack = new DynamoStack(app, "DynamoStack", {
  ...sharedProps,
  name: `${appName}-dynamo-${env}`,
});

const lambdaStack = new LambdaStack(app, "LambdaStack", {
  ...sharedProps,
  name: `${appName}-lambda-${env}`,
  dynamoStack: dynamoStack,
});

new ApiStack(app, "ApiStack", {
  ...sharedProps,
  name: `${appName}-api-${env}`,
  lambdaStack: lambdaStack,
});
