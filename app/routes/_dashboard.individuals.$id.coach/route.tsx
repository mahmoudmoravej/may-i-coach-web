import { Link, useParams } from "@remix-run/react";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  Card,
  CardBody,
  Spinner,
  Typography,
} from "@material-tailwind/react";

import {
  AdviceFragmentFragment,
  useCoachIndividualQuery,
} from "@app-types/graphql";
import { useEffect, useState } from "react";
import { noNull } from "~/utils";

import { GenerateCycleSummaryButton } from "./components/GenerateCycleSummaryButton";
import { DefaultSkeleton } from "~/components/DefaultSkeleton";

export default function IndividualCoach() {
  const { id } = useParams();
  if (id == null) throw new Error("id is null");
  const [open, setOpen] = useState(0);
  const [isOnGneratingAdvice, setIsOnGneratingAdvice] = useState(false);
  const [adviceList, setAdviceList] = useState<AdviceFragmentFragment[] | null>(
    null,
  );

  const { data, loading, error } = useCoachIndividualQuery({
    variables: { id: id },
    fetchPolicy: "network-only",
  });

  const individual = data?.individual;

  useEffect(() => {
    if (data?.adviceList?.nodes)
      setAdviceList(data?.adviceList?.nodes?.filter(noNull).map((o) => o));
  }, [data?.adviceList?.nodes]);

  if (loading) return <Spinner className="w-full" />;

  if (error) return <p>{JSON.stringify(error)}</p>;
  if (!individual || !data || !data.adviceList?.nodes) return <p>No data</p>;

  const findAdviceForCycle = (cycleId: number) =>
    adviceList?.find((o) => o.cycleId === cycleId);

  const handleOpen = (value: number) => setOpen(open === value ? 0 : value);
  const activeCycles = individual.activeCycles?.nodes
    ?.filter(noNull)
    .map((activeCycle) => ({
      ...activeCycle,
      advice: findAdviceForCycle(activeCycle.id),
    }));

  const handleIsOnGenerateCycleSummary = (
    isSaving: boolean,
    generatedAvice: AdviceFragmentFragment | null,
  ) => {
    setIsOnGneratingAdvice(isSaving);
    if (generatedAvice && adviceList) {
      const oldAdvice = adviceList.find(
        (o) => o.cycleId === generatedAvice.cycleId,
      );

      setAdviceList([
        ...adviceList.filter((o) => o !== oldAdvice),
        generatedAvice,
      ]);
    }
  };

  const cyclesMarkup = activeCycles?.map((cycle, idx) => (
    <Accordion key={idx} open={open === idx}>
      <AccordionHeader onClick={() => handleOpen(idx)}>
        {cycle.title}
      </AccordionHeader>
      <AccordionBody>
        <Card className="mb-5 mt-5 flex flex-row  space-x-4 text-base font-normal">
          <CardBody className="w-full">
            {cycle.advice
              ? `Analyzed at ${new Date(cycle.advice.analyzedAt).toLocaleString(
                  "en-CA",
                  {
                    year: "numeric",
                    month: "numeric",
                    day: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                  },
                )}, need a refresh?`
              : "This cycle has not been analyzed yet. Click the button below to analyze and get advice for this cycle."}
            <br />

            <GenerateCycleSummaryButton
              cycleId={cycle.id}
              individualId={parseInt(id)}
              title={
                cycle.advice?.isAnalyzed ? "Refresh..." : "Analyze and coach..."
              }
              onSaving={handleIsOnGenerateCycleSummary}
            />
          </CardBody>
        </Card>{" "}
        <div className="flex flex-row space-x-4  pt-0 text-base font-normal">
          <Card className="flex-1">
            <CardBody>
              <Typography variant="h6" color="gray" className="mb-4 uppercase">
                <Link
                  to={`/individuals/${id}/activities?cycleid=${cycle.id}`}
                  className="flex items-center gap-1 hover:underline"
                >
                  Activities Summary
                </Link>
              </Typography>

              <Typography color="gray" className="mb-8 font-normal">
                {isOnGneratingAdvice ? (
                  <DefaultSkeleton />
                ) : cycle.advice?.activitySummary ? (
                  cycle.advice.activitySummary
                ) : (
                  "-"
                )}
              </Typography>
            </CardBody>
          </Card>
          <Card className="flex-1">
            <CardBody>
              <Typography variant="h6" color="gray" className="mb-4 uppercase">
                Expectations
              </Typography>

              <Typography color="gray" className="mb-8 font-normal">
                {isOnGneratingAdvice ? (
                  <DefaultSkeleton />
                ) : cycle.advice?.outlookSummary ? (
                  cycle.advice.outlookSummary
                ) : (
                  "-"
                )}
              </Typography>
            </CardBody>
          </Card>
          <Card className="flex-1">
            <CardBody>
              <Typography variant="h6" color="gray" className="mb-4 uppercase">
                Coaching Advice
              </Typography>

              <Typography color="gray" className="mb-8 font-normal">
                {isOnGneratingAdvice ? (
                  <DefaultSkeleton />
                ) : cycle.advice?.result ? (
                  cycle.advice.result
                ) : (
                  "-"
                )}
              </Typography>
            </CardBody>
          </Card>
        </div>
      </AccordionBody>
    </Accordion>
  ));

  return (
    <>
      <Card color="transparent" shadow={false} className="mb-10">
        <Typography variant="h4" color="blue-gray">
          Coach {individual.fullname}
        </Typography>
      </Card>
      {cyclesMarkup}
    </>
  );
}
