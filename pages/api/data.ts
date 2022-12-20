import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';
import { defaultFilters, useFilter } from '../../store/FilterContext';

type resData =
  | {
      message: string;
      result: {
        filter: {}[];
        data: Response;
      };
    }
  | { message: unknown };

async function handler(req: NextApiRequest, res: NextApiResponse<resData>) {
  if (req.method === 'POST') {
    let reqFilter;
    try {
      const { getFilters } = useFilter();
      reqFilter = getFilters();
    } catch (e) {
      reqFilter = defaultFilters;
    }

    const passedFilters = reqFilter.map((filter) => {
      if (!filter.isSet || filter.value === null) {
        filter.value = -1;
      }

      return {
        name: filter.name,
        value: filter.value,
      };
    });

    const [idCustomer, idUser, level, source, dateFrom, dateTo, status, portal, protocol, data, car, limit] =
      passedFilters;

    const requestString = `https://data.autohaus-digital.de/log/v1/search/${idCustomer.value}/${idUser.value}/-1/-1/-1/${level.value}/${source.value}/${dateFrom.value}/${dateTo.value}/${limit.value}/-1`;

    const requestBody = {};

    try {
      const result = await axios.post(requestString);

      const data = result.data;

      res.status(200).json({
        message: 'Data received',
        result: {
          filter: passedFilters,
          data: data,
        },
      });
      return;
    } catch (e) {
      res.status(500).json({
        message: e,
      });
      return;
    }
  } else {
    res.status(405).json({
      message: 'method not allowed',
    });
    return;
  }
}

export default handler;
