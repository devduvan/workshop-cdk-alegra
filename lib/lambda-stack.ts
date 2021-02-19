import * as cdk from "@aws-cdk/core";
import * as lambda from "@aws-cdk/aws-lambda";

import { LambdaStackProps, StackBasicProps } from "../interfaces";
import { getCdkPropsFromCustomProps, getResourceNameWithPrefix } from "../util";

export class LambdaStack extends cdk.Stack {
  public readonly players: any = {};

  constructor(scope: cdk.App, id: string, props: LambdaStackProps) {
    super(scope, id, getCdkPropsFromCustomProps(props));

    const dynamoStack = props.dynamoStack;

    const playersFunctions = [
      {
        id: "CreatePlayer",
        name: "create-player",
        srcDir: "players",
        action: "create",
      },
      {
        id: "GetAllPlayers",
        name: "get-all-players",
        srcDir: "players",
        action: "getAll",
      },
    ];

    for (let index = 0; index < playersFunctions.length; index++) {
      const playerFunctionDef = playersFunctions[index];

      const functionObj = new lambda.Function(this, playerFunctionDef.id, {
        code: lambda.Code.fromAsset(`lambdas/${playerFunctionDef.srcDir}`),
        handler: `${playerFunctionDef.name}.handler`,
        runtime: lambda.Runtime.NODEJS_14_X,
        functionName: getResourceNameWithPrefix(
          `${playerFunctionDef.name}-${props.env}`
        ),
        environment: {
          PLAYERS_TABLE_NAME: dynamoStack.playersTable.tableName,
        },
      });

      dynamoStack.playersTable.grantFullAccess(functionObj);
      this.players[playerFunctionDef.action] = functionObj;
    }
  }
}
