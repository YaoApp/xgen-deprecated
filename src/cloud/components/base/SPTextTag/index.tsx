import { Tag } from 'antd'

import styles from './index.less'

interface IProps {
	value: any
}

const Index = ({ value }: IProps) => {
      return <div className={ styles._local } style={{backgroundColor:value?.bgColor}}>
            <span className="value" style={{color:value?.bgColor?'black':'inherit'}}>{ value.value }</span>
            <div className="tags_wrap flex ml_4">
                  {
                        value?.tags?.map((item:any) => <Tag color={ item.color }>{item.text}</Tag>)
                  }
            </div>
      </div>
}

export default window.$app.memo(Index)
