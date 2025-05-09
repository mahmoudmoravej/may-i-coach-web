import { useTranslation, Trans } from "react-i18next";
import React from "react";

import * as material from "@material-tailwind/react";
const {
  Card,
  CardBody,
  CardHeader,
  Typography,
  Button,
  IconButton,
  Input,
  Textarea,
  Checkbox,
} = material;

import { FingerPrintIcon } from "@heroicons/react/24/solid";
import { PageTitle, FirstPageFooter as Footer } from "~/widgets/layout";
import { FeatureCard, TeamCard } from "~/widgets/cards";

import { teamData, featuresData, contactData } from "~/routesData";

export function Home() {
  const { t } = useTranslation("routes");

  return (
    <>
      <div className="relative flex h-screen content-center items-center justify-center pb-32 pt-16">
        <div className="absolute top-0 h-full w-full bg-[url('/images/pattern.png')] bg-cover bg-center" />
        <div className="absolute top-0 h-full w-full bg-black/60 bg-cover bg-center" />
        <div className="max-w-8xl container relative mx-auto">
          <div className="flex flex-wrap items-center">
            <div className="ml-auto mr-auto w-full px-4 text-center lg:w-8/12">
              <img
                alt={t("may-i-coach")}
                src="/images/mayIcoach384.png"
                className="mx-auto h-96 w-96"
              />
              <Typography
                variant="h1"
                color="white"
                className="mb-6 font-black"
              >
                {t("ai-coaching-assistant")}
              </Typography>
              <Typography variant="lead" color="white" className="opacity-80">
                {t("landing-page-example")}
              </Typography>
            </div>
          </div>
        </div>
      </div>
      <section className="-mt-32 bg-white px-4 pb-20 pt-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuresData.map(({ color, title, icon, description }) => (
              <FeatureCard
                key={title}
                color={color}
                title={title}
                icon={React.createElement(icon, {
                  className: "w-5 h-5 text-white",
                })}
                description={description}
              />
            ))}
          </div>
          <div className="mt-32 flex flex-wrap items-center">
            <div className="mx-auto -mt-8 w-full px-4 md:w-5/12">
              <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-blue-gray-900 p-2 text-center shadow-lg">
                <FingerPrintIcon className="h-8 w-8 text-white " />
              </div>
              <Typography
                variant="h3"
                className="mb-3 font-bold"
                color="blue-gray"
              >
                {t("working-with-us")}
              </Typography>
              <Typography className="mb-8 font-normal text-blue-gray-500">
                {t("tooltips-and-popovers")}
                <br />
                <br />
                {t("pre-built-pages")}
              </Typography>
              <Button variant="filled">{t("read-more")}</Button>
            </div>
            <div className="mx-auto mt-24 flex w-full justify-center px-4 md:w-4/12 lg:mt-0">
              <Card className="rounded-lg border shadow-lg shadow-gray-500/10">
                <CardHeader floated={false} className="relative h-56">
                  <img
                    alt={t("card")}
                    src="/images/teamwork.png"
                    className="h-full w-full"
                  />
                </CardHeader>
                <CardBody>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {t("enterprise")}
                  </Typography>
                  <Typography
                    variant="h5"
                    color="blue-gray"
                    className="mb-3 mt-2 font-bold"
                  >
                    {t("top-notch-services")}
                  </Typography>
                  <Typography className="font-normal text-blue-gray-500">
                    {t("arctic-ocean-ice")}
                  </Typography>
                </CardBody>
              </Card>
            </div>
          </div>
        </div>
      </section>
      <section className="px-4 pb-48 pt-20">
        <div className="container mx-auto">
          <PageTitle section="Our Team" heading="Here are our heroes">
            {t("record-max-sea-ice")}
          </PageTitle>
          <div className="mt-24 grid grid-cols-1 gap-12 gap-x-24 md:grid-cols-2 xl:grid-cols-4">
            {teamData.map(({ img, name, position, socials }) => (
              <TeamCard
                key={name}
                img={img}
                name={name}
                position={position}
                socials={
                  <div className="flex items-center gap-2">
                    {socials.map(({ color, name }) => (
                      <IconButton key={name} color={color} variant="text">
                        <i className={`fa-brands text-xl fa-${name}`} />
                      </IconButton>
                    ))}
                  </div>
                }
              />
            ))}
          </div>
        </div>
      </section>
      <section className="relative bg-white px-4 py-24">
        <div className="container mx-auto">
          <PageTitle section="Co-Working" heading="Build something">
            {t("record-min-sea-ice")}
          </PageTitle>
          <div className="mx-auto mb-48 mt-20 grid max-w-5xl grid-cols-1 gap-16 md:grid-cols-2 lg:grid-cols-3">
            {contactData.map(({ title, icon, description }) => (
              <Card
                key={title}
                color="transparent"
                shadow={false}
                className="text-center text-blue-gray-900"
              >
                <div className="mx-auto mb-6 grid h-14 w-14 place-items-center rounded-full bg-blue-gray-900 shadow-lg shadow-gray-500/20">
                  {React.createElement(icon, {
                    className: "w-5 h-5 text-white",
                  })}
                </div>
                <Typography variant="h5" color="blue-gray" className="mb-2">
                  {title}
                </Typography>
                <Typography className="font-normal text-blue-gray-500">
                  {description}
                </Typography>
              </Card>
            ))}
          </div>
          <PageTitle section="Contact Us" heading="Want to work with us?">
            {t("contact-form-response")}
          </PageTitle>
          <form className="mx-auto mt-12 w-full lg:w-5/12">
            <div className="mb-8 flex gap-8">
              <Input
                variant="outlined"
                size="lg"
                label={t("full-name")}
                crossOrigin={undefined}
              />
              <Input
                variant="outlined"
                size="lg"
                label={t("email-address")}
                crossOrigin={undefined}
              />
            </div>
            <Textarea
              variant="outlined"
              size="lg"
              label={t("message")}
              rows={8}
            />
            <Checkbox
              label={
                <Typography
                  variant="small"
                  color="gray"
                  className="flex items-center font-normal"
                >
                  <Trans
                    i18nKey="terms-and-conditions-agreement"
                    components={{
                      "0": (
                        <a
                          href="/"
                          className="font-medium transition-colors hover:text-gray-900"
                        />
                      ),
                    }}
                  />
                </Typography>
              }
              containerProps={{ className: "-ml-2.5" }}
              crossOrigin={undefined}
            />
            <Button variant="gradient" size="lg" className="mt-8" fullWidth>
              {t("send-message")}
            </Button>
          </form>
        </div>
      </section>
      <div className="bg-white">
        <Footer />
      </div>
    </>
  );
}

export default Home;
