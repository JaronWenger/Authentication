import { CognitoUserPool } from "amazon-cognito-identity-js";

const poolData = {
    UserPoolId: "us-east-1_w6OihDRun",
    ClientId: "4caegn5e1l2ouj58gp2une13pa"
}

export default new CognitoUserPool(poolData);