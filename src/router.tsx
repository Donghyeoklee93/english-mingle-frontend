import { createBrowserRouter } from "react-router-dom";
import Root from "./components/Root";
import Home from "./routes/Home";
import NotFound from "./routes/NotFound";
import OnlineDetail from "./routes/OnlineDetail";
import GithubConfirm from "./routes/GithubConfirm";
import KakaoConfirm from "./routes/KakaoConfirm";
import UploadOnline from "./routes/UploadOnline";
import UploadPhotos from "./routes/UploadPhotos";
import HomeOfflines from "./routes/HomeOfflines";
import UploadOfflinePhotos from "./routes/UploadOfflinePhotos";
import UploadOffline from "./routes/UploadOffline";
import OfflineDetail from "./routes/OfflineDetail";
import HomeChallenges from "./routes/HomeChallenges";
import UploadChallenge from "./routes/UploadChallenge";
import ChallengeDetail from "./routes/ChallengeDetail";
import UploadChallengePhotos from "./routes/UploadChallengePhotos";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <NotFound />,
    children: [
      //online
      {
        path: "",
        element: <Home />,
      },
      {
        path: "onlines/upload",
        element: <UploadOnline />,
      },

      {
        path: "onlines/:onlinePk",
        element: <OnlineDetail />,
      },
      {
        path: "onlines/:onlinePk/photos",
        element: <UploadPhotos />,
      },

      //offline
      {
        path: "offlines",
        element: <HomeOfflines />,
      },
      {
        path: "offlines/upload",
        element: <UploadOffline />,
      },

      {
        path: "offlines/:offlinePk",
        element: <OfflineDetail />,
      },
      {
        path: "offlines/:offlinePk/photos",
        element: <UploadOfflinePhotos />,
      },

      //challenge
      {
        path: "challenges",
        element: <HomeChallenges />,
      },
      {
        path: "challenges/upload",
        element: <UploadChallenge />,
      },

      {
        path: "challenges/:challengePk",
        element: <ChallengeDetail />,
      },
      {
        path: "challenges/:challengePk/photos",
        element: <UploadChallengePhotos />,
      },

      {
        path: "social",
        children: [
          {
            path: "github",
            element: <GithubConfirm />,
          },
          {
            path: "kakao",
            element: <KakaoConfirm />,
          },
        ],
      },
    ],
  },
]);

export default router;
