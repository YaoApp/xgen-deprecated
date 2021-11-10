import { Tooltip } from 'antd'

import type { TooltipProps } from 'antd'

type IProps = TooltipProps & {
	value: string
}

const Index = (props: IProps) => {
	return <Tooltip {...props}>{props.value}</Tooltip>
}

export default window.$app.memo(Index)
