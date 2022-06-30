import { useWebSocket } from 'ahooks'
import { Badge, Button, Drawer, Tabs } from 'antd'
import { cloneDeep, findIndex } from 'lodash-es'
import { Fragment, useEffect, useState } from 'react'
import { history } from 'umi'

import { Icon } from '@/components'

import styles from './index.less'

const { TabPane } = Tabs

const Content = ({ messages, sendMessage, setVisibleNotification }: any) => {
	return (
		<Tabs className={styles._local} animated>
			{messages.map((item: any, index: number) => (
				<TabPane className='notification_item' tab={item.type} key={index}>
					<div className='message_items w_100 border_box flex flex_column'>
						{item.items.map((message: any, idx: number) => (
							<div
								className='message_item w_100 border_box flex flex_column relative'
								key={idx}
								onClick={() => {
									sendMessage(
										JSON.stringify({
											FROM: 'client',
											type: item.type,
											id: message.id
										})
									)

									if (message.link) {
										setVisibleNotification(false)
										history.push(message.link)
									}
								}}
							>
								{message.unread && (
									<span className='status absolute'></span>
								)}
								<div className='header w_100 flex justify_between align_center'>
									<span className='title'>
										{message.title.substring(0, 12)}
									</span>
									<span className='at'>{message.at}</span>
								</div>
								<div className='message_content'>
									{message.content}
								</div>
							</div>
						))}
					</div>
				</TabPane>
			))}
		</Tabs>
	)
}

const Index = ({ path, protocol }: any) => {
	const [visible_notification, setVisibleNotification] = useState(false)
	const [data, setData] = useState<any>({})
	const { sendMessage } = useWebSocket(path, {
		protocols: protocol,
		onMessage(event) {
			if (!event.data) return

			try {
				const message = JSON.parse(event.data)

				if (message?.success) {
					const _data = cloneDeep(data)

					_data['unread'] = message.unread

					const type_index = findIndex(
						_data.messages,
						(item: any) => item.type === message.type
					)
					const items_index = findIndex(
						_data['messages'][type_index]['items'],
						(item: any) => item.id === message.id
					)

					_data['messages'][type_index]['items'][items_index]['unread'] = false

					setData(_data)
				} else {
					if (message.messages) {
						setData(message)
					}
				}
			} catch (_) {}
		}
	})

	return (
		<Fragment>
			<div
				className='nav_item w_100 flex justify_center align_center clickable'
				onClick={() => {
					if (data) setVisibleNotification(true)
				}}
			>
				<Badge size='small' count={data?.unread}>
					<Icon name='icon-bell' size={20}></Icon>
				</Badge>
			</div>
			<Drawer
				title='消息通知'
				placement='left'
				visible={visible_notification}
				onClose={() => setVisibleNotification(false)}
				extra={
					<Button type='primary' size='small' ghost>
						全部已读
					</Button>
				}
			>
				{data?.messages && (
					<Content
						messages={data.messages}
						sendMessage={sendMessage}
						setVisibleNotification={setVisibleNotification}
					></Content>
				)}
			</Drawer>
		</Fragment>
	)
}

export default window.$app.memo(Index)
