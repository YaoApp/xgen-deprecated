import { DatePicker } from 'antd'

const Index = () => {
	return <DatePicker style={{ width: 240 }}></DatePicker>
}

export default window.$app.memo(Index)
