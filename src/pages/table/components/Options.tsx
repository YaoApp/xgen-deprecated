import Dynamic from '@/cloud/core'

interface IProps {
	actions: any
}

const Index = (props: IProps) => {
	const { actions } = props

	return (
		<div className='flex align_center'>
			{actions?.import?.props?.api && (
				<Dynamic
					type='option'
					name='Import'
					props={{ ...actions?.import?.props }}
				></Dynamic>
			)}
		</div>
	)
}

export default window.$app.memo(Index)
