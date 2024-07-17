import React, { useEffect, CSSProperties } from "react";
import { Duty } from "../types";
import type { FormProps } from "antd";
import { Button, Form, Input } from "antd";
import styles from "./DutyForm.module.css";
import classNames from "classnames";

type DutyFormProps = {
  onSubmit: (data: Duty) => void;
  initialData: Duty | null;
  closeEditable?: () => void;
  formStyles?: CSSProperties;
};

const DutyForm: React.FC<DutyFormProps> = ({
  onSubmit,
  initialData,
  closeEditable,
  formStyles,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (initialData) {
      form.setFieldsValue(initialData);
    } else {
      form.resetFields();
    }
  }, [initialData, form]);

  const onFinish: FormProps<Duty>["onFinish"] = (values) => {
    if (initialData) {
      onSubmit({ ...values, id: initialData.id });
      closeEditable?.();
    } else {
      onSubmit(values);
    }
    form.resetFields();
  };

  const onFinishFailed: FormProps<Duty>["onFinishFailed"] = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      className={classNames(styles.form, formStyles)}
      form={form}
      name="basic"
      labelCol={{ span: 8 }}
      style={{}}
      wrapperCol={{ span: 16 }}
      initialValues={initialData || { remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item<Duty>
        className={styles.item}
        name="name"
        rules={[{ required: true, message: "Please input a duty name." }]}
      >
        <Input className={styles.input} placeholder="Enter a new duty..." />
      </Form.Item>

      <Form.Item
        wrapperCol={{ span: 16 }}
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Button
          htmlType="submit"
          type="primary"
          style={{
            width: 100,
          }}
        >
          {initialData ? "Update Duty" : "New Duty"}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default DutyForm;
