import { connect } from 'umi'
import { Page } from '@/components'
import Filter from './Filter'
import List from './List'
import type { IModelBugList, Loading } from 'umi'
import type { IProps } from './type'

const Index = (props: IProps) => {
	const { page_data } = props
	const { list } = page_data

	const props_list = {
		list
	}

	return (
		<Page
			title='错误报告'
			options={[
				{
					title: '订阅数据',
					icon: 'icon-bookmark',
					action: ''
				},
				{
					title: '大屏投放',
					icon: 'icon-airplay',
					action: ''
				}
			]}
		>
			<Filter></Filter>
			<List {...props_list}></List>
		</Page>
	)
}

const getInitialProps = ({ loading, bug_list }: { loading: Loading; bug_list: IModelBugList }) => ({
	loading: loading.effects['bug_list/query'],
	page_data: bug_list
})

export default window.$app.memo(connect(getInitialProps)(Index))
