  import { useUser } from "@clerk/clerk-react";
  import { useState, useEffect } from "react";
  import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./card";
  import { Heart, MapPinIcon, Trash2Icon } from "lucide-react";
  import { Button } from "./button";
  import { Link } from "react-router-dom";
  import useFetch from "@/hooks/use-fetch";
  import { saveJobs } from "@/api/apiJobs";

  const JobCard = ({
    job,
    isMyJob = false,
    SavedInit = false,
    onJobSaved = () => {},
  }) => {
    const [saved, setSaved] = useState(SavedInit);

    const {
      fn: fnSavedJob,
      data: SavedJob,
      loading: loadingSavedJob,
    } = useFetch(saveJobs,{
      alreadySaved: saved,
    });

    const { user } = useUser();

    const handleSaveJob = async () => {
      await fnSavedJob({
        user_id: user.id,
        job_id: job.id,
      });
      onJobSaved();
    };

    useEffect(() => {
      if (SavedJob !== undefined) setSaved(SavedJob?.length > 0);
    }, [SavedJob]);

    return (
      <Card className="flex flex-col">
      <CardHeader>
        <CardTitle className="flex justify-between font-bold">
          {job.title}
          {isMyJob && (
            <Trash2Icon
              fill="red"
              size={18}
              className="text-red-300 cursor-pointer"
            />
          )}
        </CardTitle>
      </CardHeader>
    
      <CardContent className="flex flex-col gap-4 flex-1">
        <div className="flex justify-between">
          {job.company && <img src={job.company.logo_url} className="h-6" />}
          <div className="flex gap-2 items-center">
            <MapPinIcon size={15} /> {job.location}
          </div>
        </div>
        <hr />
        {job.description.substring(0, job.description.indexOf("."))}
      </CardContent>
    
      <CardFooter className="flex items-center justify-between gap-2">
        <Link to={`/job/${job.id}`} className="flex-1">
          <Button varient="secondary" className="w-full">
            More Details
          </Button>
        </Link>
    
        {!isMyJob && (
          <Button
            varient="outline"
            className="w-12" // Ensure the heart button has a fixed width for alignment
            onClick={handleSaveJob}
            disabled={loadingSavedJob}
          >
            {saved ? (
              <Heart size={20} stroke="red" fill="red" />
            ) : (
              <Heart size={20} />
            )}
          </Button>
        )}
      </CardFooter>
    </Card>
    
    );
  };

  export default JobCard; 
