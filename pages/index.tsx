import CollapseTable from '../Components/table/CollapseTable';
import Filterpanel from '../Components/sidebar/FilterPanel';
import { GetServerSideProps } from 'next';
import axios from 'axios';
import { Fragment } from 'react';
import { useFilter } from '../store/FilterContext';

type props = {
  data: any;
};

type Data = {
  id: number;
  date: any;
  level: number;
  quelle: number;
  status: number;
  id_firma: number;
  id_user: number;
  id_data: number;
  id_car: number;
  id_proto: number;
  id_portal: number;
  msg: string;
};

export function createData(element: Data) {
  return {
    id: element.id,
    date: element.date,
    level: translate(element.level),
    src: translate(element.quelle),
    status: element.status,
    companyId: element.id_firma,
    userId: element.id_user,
    dataId: element.id_data,
    carId: element.id_car,
    protoId: element.id_proto,
    portalId: element.id_portal,
    msg: element.msg,
    history: [
      {
        date: '2020-01-05',
        customerId: '11091700',
        amount: 3,
      },
      {
        date: '2020-01-02',
        customerId: 'Anonymous',
        amount: 1,
      },
    ],
  };
}

//kann in einzelne Functionen für Level und Quelle gesplitted werden bei Überschneidung
function translate(value: number) {
  if (!value) {
    value = 0;
  }
  switch (value) {
    case 0:
      return 'unknown';
    case 1:
      return 'critical error';
    case 2:
      return 'error';
    case 3:
      return 'warning';
    case 4:
      return 'info';
    case 9:
      return 'HOMEPAGE-TOOL';
    case 10:
      return 'SHOW-ROOM';
  }
  return '';
}

function Home({ data }: props) {
  // if (data.length) {
  return (
    <Fragment>
      <Filterpanel />
      <CollapseTable data={data} />
    </Fragment>
  );
  // }
  // return (
  //   <div>
  //     <p>Loading...</p>
  //   </div>
  // );
}

export const getServerSideProps: GetServerSideProps = async () => {
  let data: Array<object> = [];
  let levelValues: string[];
  let sourceValues: string[];
  let statusValues: number[];
  let portalValues: number[];

  axios
    .post('http://localhost:3000/api/data')
    .then((response) => {
      const result = response.data.result.data;

      result.forEach((element: Data) => {
        
        data.push(createData(element));
        // levelValues.push(translate(element.level));
        // sourceValues.push(translate(element.quelle));
        // statusValues.push(element.status);
        // portalValues.push(element.id_portal);
      });

      try {
        const { setSelectValues } = useFilter();
        setSelectValues([
          { name: 'source', values: sourceValues },
          { name: 'status', values: statusValues },
          { name: 'level', values: levelValues },
          { name: 'portal', values: portalValues },
        ]);
      } catch (e) {}
      return data;
    })
    .catch(function (error) {
      console.log('Error', error.message);
    });
  return {
    props: {
      data: data,
    },
  };
};

export default Home;
