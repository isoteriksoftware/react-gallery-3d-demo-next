/* eslint-disable @next/next/no-img-element */
import githubIcon from "@/assets/github.svg";

const GITHUB_USERNAME = "isoteriksoftware";
const LIBRARY_NAME = "react-gallery-3d";
const DEMO_REPO = "react-gallery-3d-demo-next";

const Footer = () => {
  return (
    <footer
      style={{
        background: "rgba(41, 40, 40, 0.5)",
        width: "100%",
        display: "flex",
        alignItems: "center",
        padding: "10px",
        paddingTop: "16px",
        backdropFilter: "blur(4px)",
      }}
    >
      <a
        href={`https://github.com/${GITHUB_USERNAME}/${DEMO_REPO}`}
        target="_blank"
      >
        <img src={githubIcon.src} alt="Demo repo" width="40" height="40" />
      </a>

      <div
        style={{
          display: "flex",
          columnGap: "10px",
          justifyContent: "center",
          alignItems: "flex-start",
          flexGrow: 1,
        }}
      >
        <a
          href={`https://www.npmjs.com/package/${LIBRARY_NAME}`}
          target="_blank"
        >
          <img
            src={`https://img.shields.io/npm/v/${LIBRARY_NAME}.svg`}
            alt="NPM"
          />
        </a>

        <img
          src={`https://img.shields.io/npm/dt/${LIBRARY_NAME}.svg`}
          alt="NPM"
        />

        <a
          href={`https://github.com/${GITHUB_USERNAME}/${LIBRARY_NAME}`}
          target="_blank"
        >
          <img
            src={`https://img.shields.io/github/stars/${GITHUB_USERNAME}/${LIBRARY_NAME}?style=social`}
            alt="GitHub stars"
          />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
