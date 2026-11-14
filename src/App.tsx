import { lazy, Suspense, useState } from "react";
import Landing from "./Landing";

const PostSignIn = lazy(() => import("./PostSignIn"));

export default function App() {
  const [signedIn, setSignedIn] = useState(false);

  return signedIn ? (
    <Suspense fallback={<div className="app-loading">Preparing your PennSide…</div>}>
      <PostSignIn onSignOut={() => setSignedIn(false)} />
    </Suspense>
  ) : (
    <Landing onSignedIn={() => setSignedIn(true)} />
  );
}
