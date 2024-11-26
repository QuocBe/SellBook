import React, { useState, useEffect } from "react";
import { Form, Input, Button, Select, Typography, message } from "antd";
import { fetchProfileData, updateProfileData } from "../../service/ProfileService";
import Navbar from "../Header/HeaderHome";
import "../../assets/style/Guest/Profile.scss";

const { Title } = Typography;

const ProfileGuest = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState(null);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  const vietnamData = {
    "Hà Nội": {
      "Ba Đình": ["Phúc Xá", "Cống Vị", "Quán Thánh"],
      "Hoàn Kiếm": ["Hàng Bạc", "Đồng Xuân", "Cửa Đông"],
    },
    "Hồ Chí Minh": {
      "Quận 1": ["Bến Nghé", "Bến Thành", "Nguyễn Thái Bình"],
      "Quận 3": ["Phường 1", "Phường 2", "Phường 3"],
    },
    "Đà Nẵng": {
      "Hải Châu": ["Thanh Bình", "Phước Ninh", "Nam Dương"],
      "Liên Chiểu": ["Hòa Khánh Bắc", "Hòa Khánh Nam", "Hòa Minh"],
    },
  };

  useEffect(() => {
    const currentUserEmail = localStorage.getItem("userEmail");
    if (currentUserEmail) {
      fetchUserData(currentUserEmail);
    }
  }, []);

  const fetchUserData = async (email) => {
    try {
      await fetchProfileData(email, form, setUserId, handleProvinceChange, handleDistrictChange);
    } catch (error) {
      message.error("Failed to fetch user data.");
    }
  };

  const handleProvinceChange = (value) => {
    if (vietnamData[value]) {
      setDistricts(Object.keys(vietnamData[value]));
      setWards([]);
      form.setFieldsValue({ district: null, ward: null });
    }
  };

  const handleDistrictChange = (value) => {
    const selectedProvince = form.getFieldValue("province");
    if (vietnamData[selectedProvince] && vietnamData[selectedProvince][value]) {
      setWards(vietnamData[selectedProvince][value]);
      form.setFieldsValue({ ward: null });
    }
  };

  const handleSubmit = async (values) => {
    if (!userId) {
      message.error("User ID not found!");
      return;
    }

    setLoading(true);
    try {
      await updateProfileData(userId, values);
      message.success("Profile updated successfully!");
    } catch (error) {
      message.error("Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="profile-page">
      <Navbar />
      <div className="profile-container">
        <Form form={form} layout="vertical" onFinish={handleSubmit} className="form-section">
          <Title level={4}>Account Information</Title>
          <Form.Item name="name" label="Name" rules={[{ required: true, message: "Name is required" }]}>
            <Input placeholder="Enter your name" />
          </Form.Item>
          <Form.Item name="email" label="Email">
            <Input placeholder="Enter your email" disabled />
          </Form.Item>
          <Title level={4}>Pickup Address</Title>
          <Form.Item name="phoneNumber" label="Phone Number">
            <Input placeholder="Enter your phone number" />
          </Form.Item>
          <Form.Item name="province" label="Province/City">
            <Select placeholder="Select your province" onChange={handleProvinceChange}>
              {Object.keys(vietnamData).map((province) => (
                <Select.Option key={province} value={province}>
                  {province}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="district" label="District">
            <Select placeholder="Select your district" onChange={handleDistrictChange}>
              {districts.map((district) => (
                <Select.Option key={district} value={district}>
                  {district}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="ward" label="Ward/Commune">
            <Select placeholder="Select your ward">
              {wards.map((ward) => (
                <Select.Option key={ward} value={ward}>
                  {ward}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="address" label="Building, house number">
            <Input placeholder="Enter your address" />
          </Form.Item>

          <Form.Item className="button-group">
            <Button type="primary" htmlType="submit" loading={loading}>
              Submit
            </Button>
            <Button style={{ marginLeft: "10px" }} onClick={() => form.resetFields()}>
              Cancel
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default ProfileGuest;
