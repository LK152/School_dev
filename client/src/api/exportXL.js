import XLSX from 'xlsx';
import FS from 'file-saver';

const exportXL = (records, fileName) => {
	const fileType =
		'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
	const fileExtent = '.xlsx';

	const docs = records.map((doc) => {
		return {
			班級: doc.class,
			座號: doc.number, 
			姓名: doc.name, 
			Email: doc.email,
			主題: doc.topicLabel,
			副主題: doc.subTopicLabel,
			備註: doc.comment,
			組員人數: doc.memNum,
			組員1: doc.mem1Class.toString() + doc.mem1Num.toString(),
			組員2: doc.mem2Class.toString() + doc.mem2Num.toString(),
		};
	});

	const ws = XLSX.utils.json_to_sheet(docs);
	const wb = { Sheets: { data: ws }, SheetNames: ['data'] };
	const excelBuffer = XLSX.write(wb, {
		bookType: 'xlsx',
		type: 'array',
	});
	const data = new Blob([excelBuffer], { type: fileType });
    
	return FS.saveAs(data, fileName + fileExtent);
};

export default exportXL;
