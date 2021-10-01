import { request } from 'umi'
import { useRequest } from 'ahooks'
import Dynamic from '@/cloud/core'

const Index = () => {
	const { data = {} } = useRequest(() => request('/api/xiang/table/service/setting'))

	return <Dynamic category='renders' type='List' props={data}></Dynamic>
}

export default window.$app.memo(Index)
