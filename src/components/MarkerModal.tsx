import { useEffect } from "react";
import { Form, Input, InputNumber } from "antd";
import { StyledMarkerModal } from "../styledComponents";
// import { ADD_FACTORY, EDIT_FACTORY } from "../common";

const MarkerModal = ({
  modalVisible,
  currentDetail,
  handleModalOk,
  setModalVisible,
}: {
  modalVisible: boolean;
  currentDetail: any;
  handleModalOk: Function;
  setModalVisible: any;
}) => {
  const [form] = Form.useForm();

  const onFinish = (value: any) => {
    handleModalOk(
      value.longitude,
      value.latitude,
      value.productName,
      value.quantity,
    );
  };

  useEffect(() => {
    form.setFieldsValue({
      latitude: currentDetail.latitude,
      longitude: currentDetail.longitude,
      productName: currentDetail.productName,
      quantity: currentDetail.quantity,
    });
  }, [
    form,
    currentDetail.latitude,
    currentDetail.longitude,
    currentDetail.productName,
    currentDetail.quantity,
  ]);
  return (
    <StyledMarkerModal
      forceRender
      visible={modalVisible}
      onCancel={() => setModalVisible(false)}
      maskStyle={{ background: "transparent" }}
      bodyStyle={{ paddingTop: "50px" }}
      onOk={() => [
        form.validateFields().then((values) => {
          console.log("表单的验证值", values);
          onFinish(values);
          setModalVisible(false);
        }),
      ]}
    >
      <Form form={form} name="orderMarkerDetailChange" onFinish={onFinish}>
        <Form.Item
          label="latitude"
          name="latitude"
          rules={[{ required: true, message: "Latitude is required!" }]}
        >
          {/* 纬度 0-90 */}
          <InputNumber value={currentDetail.latitude} />
        </Form.Item>

        <Form.Item
          label="longitude"
          name="longitude"
          rules={[{ required: true, message: "Longitude is required!" }]}
        >
          {/* 经度 0-180 */}
          <InputNumber value={currentDetail.longitude} />
        </Form.Item>

        <Form.Item
          label="productName"
          name="productName"
          rules={[{ required: true, message: "ProductType is required!" }]}
        >
          <Input value={currentDetail.productName} type="text" />
        </Form.Item>

        <Form.Item
          label="quantity"
          name="quantity"
          rules={[{ required: true, message: "quantity is required!" }]}
        >
          <InputNumber value={currentDetail.quantity} />
        </Form.Item>
      </Form>
    </StyledMarkerModal>
  );
};

export default MarkerModal;
