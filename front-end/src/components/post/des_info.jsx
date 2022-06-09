import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import './des_info.css';
import './post-recipe.css';
const DesInfo = ({ description, setDescription }) => {
	const {
		register,
		formState: { errors },
	} = useFormContext();

	const [countContent, setCountContent] = useState(3000);
	return (
		<div className="info__container">
			<h3 className="info__title">THÔNG TIN MÔ TẢ</h3>
			<div className="info__form-group col-full">
				<label htmlFor="description" className="info__form-label">
					Giới thiệu món ăn <span className="text-red">*</span>
					<span className="count-key">{countContent} </span>
				</label>

				<textarea
					row="5"
					cols="5"
					className="info__form-textarea"
					id="description"
					name="description"
					type="text"
					{...register('content')}
					maxLength="3000"
					minLength="30"
					placeholder="Giới thiệu chung về món ăn của bạn. Ví dụ: Cháo thịt heo bí đỏ cung cấp đầy đủ dinh dưỡng và năng lượng cho các hoạt động hằng ngày của các bé. Bạn có thể thêm món này vào thực đơn ăn dặm, bé sẽ thích lắm đây. Chỉ với 40 phút thực hiện."
					value={description}
					onChange={(e) => {
						setDescription(e.target.value);
						setCountContent(3000 - e.target.value.length);
					}}
				/>

				<p className={errors.content?.message ? 'active' : 'non-active'}>
					{errors.content?.message}
				</p>
			</div>
		</div>
	);
};

export default DesInfo;
