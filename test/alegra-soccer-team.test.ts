import { expect as expectCDK, matchTemplate, MatchStyle } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import * as AlegraSoccerTeam from '../lib/alegra-soccer-team-stack';

test('Empty Stack', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new AlegraSoccerTeam.AlegraSoccerTeamStack(app, 'MyTestStack');
    // THEN
    expectCDK(stack).to(matchTemplate({
      "Resources": {}
    }, MatchStyle.EXACT))
});
