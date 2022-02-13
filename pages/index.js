import Head from 'next/head';
import Image from 'next/image';
import { useMemo } from 'react';
import axios from 'axios';
import styles from '../styles/Home.module.css';
import TableStructure from '../components/Table/Table';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Home({stuDataArray}) {

	const columns = useMemo(
		() => [
		  {
			Header: 'Name',
			accessor: 'name',
		  },
		  {
			Header: 'Hours',
			accessor: 'hours',
		  },
		  {
			Header: 'Roll Number',
			accessor: 'rno',
		  },
		  {
			Header: 'Email',
			accessor: 'email',
		  },
		],
		[]
	  )

  	return (
  	  	<div className={styles.container}>
				<TableStructure columns = {columns} data = {stuDataArray}/>
  	  	</div>
  	)
}

export async function getStaticProps() {
	const res = await axios.get("https://opensheet.elk.sh/1YO1xftUTEn8cuE7p5-9_NlTOAghpNhRQi4WagF3ce2o/Form%20Responses%201")
	const data = res.data

	var stuData = {}
	var rollData = {}

	for(const student of data){

		if(!student["Roll Number"]){
			continue;
		}

		const roll = student["Roll Number"].toUpperCase();
		var stuObj = {name: student["Name"], email: student["Email Address"]};
		rollData[roll] = (rollData[roll] ?? 0) + Number(student["Hrs "]);
		stuObj["hours"] = rollData[roll];
		stuData[roll] = stuObj;
	}

	const stuDataArray = Object.entries(stuData).map((e) => {
		return {...e[1], rno: e[0]};
	});

	return {
	  	props: {
			stuDataArray,
	  	},
		revalidate: 5,  
	}
	
}