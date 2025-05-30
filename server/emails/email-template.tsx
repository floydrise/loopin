import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Text,
  Img,
} from "@react-email/components";

const EmailTemplate = ({ userName }: { userName: string }) => (
  <Html>
    <Head />
    <Body style={main}>
      <Preview>Congratulations 🎉</Preview>
      <Container style={container}>
        <Img
          src="https://i.imgur.com/zkm7pv6.png"
          alt="LoopIn - company logo"
          width="300"
        />
        <Heading style={h1}>Hi, {userName} 👀👋🏻</Heading>
        <Text style={{ ...text, marginBottom: "14px" }}>
          Thank you for signing up for an experience, check your profile 🙂.
          Great things await you 🚀
        </Text>
        <Text style={{ ...footer, marginBottom: 0 }}>
          Yours truly, the LoopIn team 📍
        </Text>
        <Text style={{ ...footer, marginTop: 0, marginBottom: 0 }}>
          This email is not monitored, please do not reply!
        </Text>
      </Container>
    </Body>
  </Html>
);

export default EmailTemplate;

const main = {
  backgroundColor: "#ffffff",
};

const container = {
  paddingLeft: "12px",
  paddingRight: "12px",
  margin: "0 auto",
};

const h1 = {
  color: "#333",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: "24px",
  fontWeight: "bold",
  margin: "40px 0",
  padding: "0",
};

const text = {
  color: "#333",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: "14px",
  margin: "24px 0",
};

const footer = {
  color: "#898989",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: "12px",
  lineHeight: "22px",
  marginTop: "12px",
  marginBottom: "24px",
};
