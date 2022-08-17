import { Select } from 'antd'

import styles_common from '@/cloud/components/form/FormPrinter/common.less'

import type { SelectProps } from 'antd'

const Index = (props: SelectProps) => {
	return (
		<Select
			{...props}
			dropdownClassName={styles_common.select_dropdown}
			allowClear
		></Select>
	)
}

export default window.$app.memo(Index)
