import React, { Component } from 'react';
import { Fragment } from 'react/cjs/react.production.min';
import './Slogan.css';
import Left from '../../assets/introduction_page/left.png';
import Mid from '../../assets/introduction_page/mid.png';
import Right from '../../assets/introduction_page/right.png';

class Information extends Component {
	render() {
		return (
			<Fragment>
				<div className="slogan_wrapper">
					<div className="slogan_frame">
						<div className="slogan_picture_left">
							<img src={Left}></img>
						</div>
						<div className="slogan_frame_title">Tầm nhìn</div>
						<div className="slogan_frame_content">
							Trở thành kênh công thức nấu ăn lớn nhất Việt Nam
						</div>
					</div>

					<div className="slogan_frame">
						<div className="slogan_picture_mid">
							<img src={Mid}></img>
						</div>
						<div className="slogan_frame_title">Mục tiêu</div>
						<div className="slogan_frame_content">
							Mang đến những món ăn chất lượng
						</div>
					</div>

					<div className="slogan_frame">
						<div className="slogan_picture_right">
							<img src={Right}></img>
						</div>
						<div className="slogan_frame_title">Giá trị cốt lõi</div>
						<div className="slogan_frame_content">
							Tập trung vào khách hàng và quyết tâm đạt được mục tiêu
						</div>
					</div>
				</div>
			</Fragment>
		);
	}
}
/*
s
*/
export default Information;
