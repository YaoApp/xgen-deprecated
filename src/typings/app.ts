export type Memo = <T>(
	el: (props: T) => JSX.Element | null
) => React.MemoExoticComponent<(props: T) => JSX.Element | null>
