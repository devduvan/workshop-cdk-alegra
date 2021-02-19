import * as cdk from "@aws-cdk/core";
import * as dynamoDb from "@aws-cdk/aws-dynamodb";
import { StackBasicProps } from "../interfaces";
import { getCdkPropsFromCustomProps, getResourceNameWithPrefix } from "../util";

export class DynamoStack extends cdk.Stack {
  public readonly playersTable: dynamoDb.Table;

  constructor(scope: cdk.Construct, id: string, props: StackBasicProps) {
    super(scope, id, getCdkPropsFromCustomProps(props));

    this.playersTable = new dynamoDb.Table(this, "PlayersTable", {
      partitionKey: {
        name: "id",
        type: dynamoDb.AttributeType.STRING,
      },
      tableName: getResourceNameWithPrefix(`players-${props.env}`),
    });
  }
}
