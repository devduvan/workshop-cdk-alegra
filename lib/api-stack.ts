import * as cdk from "@aws-cdk/core";
import * as apiGw from "@aws-cdk/aws-apigateway";

import { ApiStackProps } from "../interfaces";
import { getCdkPropsFromCustomProps, getResourceNameWithPrefix } from "../util";

export class ApiStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props: ApiStackProps) {
    super(scope, id, getCdkPropsFromCustomProps(props));

    const lambdaStack = props.lambdaStack;

    const api = new apiGw.RestApi(this, "Api", {
      restApiName: getResourceNameWithPrefix(`api-${props.env}`),
      deployOptions: {
        stageName: props.env,
      },
    });

    const playersResource = api.root.addResource("players");

    playersResource.addMethod(
      "POST",
      new apiGw.LambdaIntegration(lambdaStack.players.create)
    );

    playersResource.addMethod(
      "GET",
      new apiGw.LambdaIntegration(lambdaStack.players.getAll)
    );
  }
}
