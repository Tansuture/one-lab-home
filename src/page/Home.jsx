import { Link } from "react-router-dom";
import "./styles.css";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const [availabilityZone, setAvailabilityZone] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://169.254.169.254/latest/meta-data/placement/availability-zone",
          {
            headers: {
              "X-aws-ec2-metadata-token":
                "AQAEABUlqXs8wCetMEXYr40nRIOMT3HYihEJX1Bjya3Nl9az-SI8Aw==",
            },
          }
        );
        setAvailabilityZone(response.data);
      } catch (error) {
        console.error(
          "There was an error fetching the availability zone:",
          error
        );
      }
    };

    fetchData();
  }, []);
  return (
    <nav className="navigation-menu">
      <div>{availabilityZone}</div>
      <Link to="/add">Go to Add page</Link>
      <Link to="/list">Go to List page</Link>
    </nav>
  );
}
