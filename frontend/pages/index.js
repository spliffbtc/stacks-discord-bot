import { useState, useEffect, useCallback } from "react";
import Head from "next/head";
import {
    AppConfig,
    UserSession,
    showConnect,
    openContractCall,
} from "@stacks/connect";
import {
    uintCV,
    stringUtf8CV,
    contractPrincipalCV,
    makeStandardSTXPostCondition,
    makeContractSTXPostCondition,
    standardPrincipalCV,
    callReadOnlyFunction,
} from "@stacks/transactions";
import { StacksMainnet } from "@stacks/network";
import { FeeRateFromJSON } from "@stacks/blockchain-api-client";
import useInterval from "@use-it/interval";

export default function Home() {
    const appConfig = new AppConfig(["publish_data"]);
    const userSession = new UserSession({ appConfig });
    
    // Authentication
    const [userData, setUserData] = useState({});
    const [walletAddress, setWalletAddress] = useState("");
    const [loggedIn, setLoggedIn] = useState(false);
    const [loggedOut, setLoggedOut] = useState(true);

    // Misc
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    // Set up the network and API
    const network = new StacksMainnet();

    // Get the user data and session
    function authenticate() {
        showConnect({
            appDetails: {
                name: "SNNS",
                icon: "https://assets.website-files.com/618b0aafa4afde65f2fe38fe/618b0aafa4afde2ae1fe3a1f_icon-isotipo.svg",
            },
            redirectTo: "/",
            onFinish: () => {
                window.location.reload();
            },
            userSession,
        });
    }

    // Sign In
    useEffect(() => {
        if (userSession.isSignInPending()) {
            userSession.handlePendingSignIn().then((userData) => {
                setUserData(userData);
            });
        } else if (userSession.isUserSignedIn()) {
            setLoggedIn(true);
            setUserData(userSession.loadUserData());
            setWalletAddress(userSession.loadUserData().profile.stxAddress.mainnet);
        }
    }, []);

    // Render UI
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <Head>
                <title>Stacks-Discord-Bot</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
                <div className="flex flex-col w-full items-center justify-center">
                    <h1 className="text-6xl font-bold mb-24">Stacks-Discord-Bot</h1>
                    {loggedIn ? (
                        <>
                        <div className="flex flex-col items-center justify-center w-full">
                            <h2 className="text-4xl font-bold mb-24">
                                Welcome, <br></br>{walletAddress}. You are now verified.
                            </h2>
                            <div className="flex flex-col items-center justify-center w-full">
                                <button
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                    onClick={() => {
                                        userSession.signUserOut(window.location.href);
                                        setLoggedIn(false);
                                        setLoggedOut(true);
                                    }}
                                >
                                    Sign Out
                                </button>
                            </div>
                        </div>
                        </>
                    ) : (
                        <div className="flex flex-col items-center justify-center w-full">
                        <h2 className="text-4xl font-bold mb-24">
                            Welcome, connect wallet to verify.
                        </h2>
                        <button
                            className="bg-white-500 hover:bg-gray-300 border-black border-2 font-bold py-2 px-4 rounded mb-6"
                            onClick={() => authenticate()}
                        >
                            Connect Wallet
                        </button>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
