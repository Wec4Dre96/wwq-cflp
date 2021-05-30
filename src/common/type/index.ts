/* eslint-disable no-lone-blocks */
export interface ViewportType {
  width: number;
  height: number;
  latitude: number;
  longitude: number;
  zoom: number;
}

export interface SingleMarkerProps {
  key: string;
  type: string;
  latitude: number;
  longitude: number;
  productType?: string;
  quantity?: number;
}

export interface SingleFactory {
  key: string;
  type: string;
  latitude: number;
  longitude: number;
  productType?: string;
  quantity?: number;
  cost?: number;
}

// export interface CusMarkersProps {
//   [key: string]: SingleMarkerProps;
// }

export interface MarkersGroupProps {
  type: string;
  detail: SingleMarkerProps[];
}

export interface FactoryGroupProps {
  type: string;
  detail: SingleFactory[];
}

export interface DisplayMarkers {
  orders: MarkersGroupProps;
  stores: MarkersGroupProps;
  factories: FactoryGroupProps;
}

export interface SingleHistoryRecord {
  time: string;
  detail: any;
  productType: string;
}

// export interface HistoriesRecordProps {
//   records
// }
{
  /* <SubMenu key="sub2" icon={<BankTwoTone />} title="Store Markers">
            <ListWrapper>
              <List
                bordered={true}
                size="small"
                dataSource={stores.detail}
                renderItem={(item) => (
                  <List.Item key={item.key}>
                    <PositionText>
                      <div>{`latitude: ${item.latitude}`}</div>
                      <div>{`longitude: ${item.longitude}`}</div>
                      <div>{`product type: ${item.productType}`}</div>
                      <div>{`produce number: ${item.quantity}`}</div>
                    </PositionText>
                    <IconGroup>
                      <IconWrapper>
                        <EditOutlined
                          onClick={() => {
                            handleEditMarker(item, EDIT_STORE);
                          }}
                        />
                      </IconWrapper>
                      <IconWrapper>
                        <AimOutlined onClick={() => onViewportChange(item)} />
                      </IconWrapper>
                      <IconWrapper>
                        <MinusOutlined
                          onClick={() =>
                            handleMarkersRemove(REMOVE_STORE, item.key)
                          }
                        />
                      </IconWrapper>
                    </IconGroup>
                  </List.Item>
                )}
              />
            </ListWrapper>
          </SubMenu> */
}
{
  /* </> */
}
{
  /* ) : null} */
}
