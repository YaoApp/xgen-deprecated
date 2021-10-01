import Dynamic from './Dynamic'
import type { IProps as IPropsDynamic } from './Dynamic'

interface IProps extends IPropsDynamic {
	props: { [key: string]: any }
}

const Index = (props: IProps) => {
	return <Dynamic {...props} />
}

export default window.$app.memo(Index)
