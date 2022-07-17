import { Text, Link } from "@nextui-org/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";

import { useState } from "react";

export default function Home() {
  const [balance, setBalance] = useState(0.001);

  return (
    <>
      <nav className="flex place-content-between m-5">
        <Link
          href="/"
          css={{
            textGradient: "45deg, $blue600 -20%, $pink600 50%, $yellow800 90%",
          }}
        >
          <a className="text-2xl pt-1 px-2 rounded-lg">SendMoni</a>
        </Link>
        <ConnectButton />
      </nav>

      <main className="flex flex-col items-center text-center mx-10 my-3">
        <Text
          h1
          css={{
            textGradient: "45deg, $blue600 -20%, $pink600 50%, $yellow800 90%",
          }}
          className="font-pressStart max-w-3xl"
        >
          Store, Send, and Receive moni easily
        </Text>

        <div className="mt-5">
          <Text
            h3
            css={{
              textGradient: "45deg, $pink600 50%, $yellow800 90%",
            }}
            className="font-pressStart"
          >
            BAL: {balance} ETH
          </Text>
        </div>
      </main>
    </>
  );
}
