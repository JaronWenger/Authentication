import React, { createContext, useState } from 'react'
import Pool from '../UserPool';
import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";

const AccountContext = createContext();

const Account = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

      // Check the current user session to determine the login status
    const getSession = async () => {
        return await new Promise((resolve, reject) => {
            const user = Pool.getCurrentUser();
            if (user) {
                user.getSession( async (err, session) => {  //create a clean object to access user attributes
                    if (err) {
                        reject("Session retrieval failed: " + err.message);
                    }else {
                        setIsLoggedIn(true); // Update the state to trigger re-render

                        const attributes = await new Promise((resolve, reject) => {
                            user.getUserAttributes((err, attributes) => {
                                if (err) {
                                    reject("Failed to get user attributes: " + err.message);
                                }else{
                                    const results = {}

                                    for (let attribute of attributes){
                                        const { Name, Value } = attribute
                                        results[Name] = Value
                                    }

                                    resolve(results);
                                }
                            })
                        })
                        resolve({ user, ...session, ...attributes });
                    }
                });
            }else{
                setIsLoggedIn(false); // User is not logged in
                reject("No current user.");
            }
        })
    }





    const authenticate = async (Username, Password) => {
        return await new Promise((resolve, reject) => {
            const user = new CognitoUser({
                Username,
                Pool,
            });
    
            const authDetails = new AuthenticationDetails({
                Username,
                Password,
            });
    
            user.authenticateUser(authDetails, {
                onSuccess: (data) => {
                    console.log("onSucces: ", data);
                    setIsLoggedIn(true); // Update state to trigger re-render
                    resolve(data);
                },
                onFailure: (err) => {
                    console.error("onFailure ", err);
                    setIsLoggedIn(false);
                    reject(err);
                },
                newPasswordRequired: (data) => {
                    console.log("newPasswordRequired: ", data);
                    resolve(data);
                }
    
            })
        })
    }

    const logOut = () => {
        const user = Pool.getCurrentUser();
        if (user) {
            user.signOut();
        }
        setIsLoggedIn(false); // Update state to trigger re-render
    }






  return (
    <AccountContext.Provider value = {{ isLoggedIn, authenticate, getSession, logOut }}>
        {props.children}

    </AccountContext.Provider>
  )
}


export { Account, AccountContext };