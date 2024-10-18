import { useUser } from "@clerk/clerk-react";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { BarLoader } from "react-spinners";
import useFetch from "@/hooks/use-fetch";
import { getSingleJob } from "@/api/apiJobs";
import {
  Briefcase,
  DoorClosed,
  DoorOpen,
  MapPin,
  MapPinIcon,
} from "lucide-react";
import MDEditor from "@uiw/react-md-editor";

const Jobpage = () => {
  const { isLoaded, user } = useUser();
  const { id } = useParams();

  const {
    loading: loadingJob,
    data: job,
    fn: fnJob,
  } = useFetch(getSingleJob, {
    job_id: id,
  });

  useEffect(() => {
    if (isLoaded) fnJob();
  }, [isLoaded]);

  if (!isLoaded || loadingJob) {
    return <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />;
  }

  return (
    <div className="p-8">
      <div className="flex flex-col-reverse gap-6 md:flex-row items-center justify-between">
        <h1 className="gradient-title font-extrabold pb-3 text-4xl sm:text-6xl">
          {job?.title}
        </h1>
        <img src={job?.company?.logo_url} className="h-12" alt={job?.title} />
      </div>

      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <MapPinIcon />
          {job?.location}
        </div>
        <div className="flex items-center gap-2">
          <Briefcase /> {job?.applications?.length} Applicants
        </div>
        <div className="flex items-center">
          {job?.isOpen ? (
            <>
              <DoorOpen /> Open
            </>
          ) : (
            <>
              <DoorClosed /> Closed
            </>
          )}
        </div>
      </div>

      <h2 className="mt-6 text-2xl sm:text-3xl font-bold">About the Job</h2>
      <p className="mt-2 sm:text-lg">{job?.description}</p>

      <h2 className="mt-6 text-2xl sm:text-3xl font-bold">
        What We Are Looking For
      </h2>
      <MDEditor.Markdown
        source={job?.requirements}
        className="bg-transparent sm:text-lg"
      />
    </div>
  );
};

export default Jobpage;
