import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    let session: any = await getSession({ req })
      .then((res) => {
        console.log("session from getSessio", res);
        return res;
      })
      .catch((err) => {
        // console.log(err);
      });

    const config = {
      headers: {
        "Content-Type": "json",
        Accept: "application/json;charset=UTF-8",
        Authorization: `Token ${session?.user?.auth_token}`,
      },
    };

    console.log(config);
    await axios
      .get(
        "https://surveyplanner.pythonanywhere.com/api/company/companymembers/companymember/",
        config
      )
      .then((response) => {
        res.status(200);
        res.json(response.data);
      })
      .catch((err) => {
        return res.status(err.status || 500).end(err.message);
      });
  } catch (error) {
    return res.status(500).end("Internal server error");
  }
}
