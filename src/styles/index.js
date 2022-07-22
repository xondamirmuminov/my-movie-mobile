import styled from 'styled-components';
import {COLORS, STYLE_CONFIGS} from '../constants';

import {
  SafeAreaView,
  TouchableOpacity,
  Text,
  View,
  Pressable,
  Dimensions,
  Platform,
} from 'react-native';

const S = {};

S.SafeAreaView = styled(SafeAreaView)`
  flex: 1;
  min-height: ${Dimensions.get('window').height - 100}px;};
  background-color: ${COLORS.SCREEN_BG};
`;

S.Container = styled(View)`
  padding: 0px 20px;
  flex: 1;
  background-color: ${COLORS.SCREEN_BG};
  ${Platform.OS === 'android' && 'padding-bottom: 20px;'}
`;

S.Title = styled(Text)`
  font-family: 'Poppins';
  font-style: normal;
  font-weight: ${props => props.weight || 600};
  font-size: ${props => props.size || '24px'};
  line-height: ${props => props.lineHeight || '28px'};
  letter-spacing: ${props => props.letterSpacing || '-0.24px'};
  color: ${props => props.color || COLORS.TITLE_COLOR};
  margin-bottom: ${props => props.mb || '0px'};
  margin-top: ${props => props.mt || '0px'};
  margin-left: ${props => props.ml || '0px'};
  text-align: ${props => props.align || 'left'};
`;

S.SubTitle = styled(Text)`
  font-family: 'Poppins';
  font-style: normal;
  font-weight: ${props => props.weight || 400};
  font-size: ${props => props.size || '16px'};
  line-height: ${props => props.lineHeight || '28px'};
  letter-spacing: ${props => props.letterSpacing || '-0.24px'};
  color: ${props => props.color || COLORS.SUBTITLE_COLOR};
  margin-bottom: ${props => props.mb || '0px'};
  margin-top: ${props => props.mt || '0px'};
  margin-left: ${props => props.ml || '0px'};
  text-align: ${props => props.align || 'left'};
`;

S.Text = styled(Text)`
  font-family: 'Poppins';
  font-style: normal;
  font-weight: ${props => props.weight || 400};
  font-size: ${props => props.size || '15px'};
  line-height: ${props => props.lineHeight || '26px'};
  color: ${props => props.color || COLORS.TEXT_COLOR};
  margin-bottom: ${props => props.mb || '0px'};
  margin-top: ${props => props.mt || '0px'};
  margin-left: ${props => props.ml || '0px'};
  margin-right: ${props => props.mr || '0px'};
  letter-spacing: ${props => props.letterSpacing || '0px'};
  text-align: ${props => props.align || 'left'};
`;

S.RedButton = styled(TouchableOpacity)`
  width: ${props => props.width || '100%'};
  height: ${props => props.height || '52px'};
  background-color: ${props => props.bgColor || COLORS.RED};
  border-radius: ${props => props.borderRadius || '20px'};
  justify-content: center;
  align-items: center;
  margin-top: ${props => props.mt || '0px'};
  margin-bottom: ${props => props.mb || '0px'};
`;

S.RedButtonText = styled(Text)`
  font-family: 'Poppins';
  font-style: normal;
  font-weight: ${props => props.weight || 500};
  font-size: ${props => props.size || '15px'};
  line-height: ${props => props.lineHeight || '20px'};
  text-align: center;
  color: ${props => props.color || COLORS.WHITE};
  letter-spacing: ${props => props.letterSpacing || '-0.24px'};
`;

S.Pressable = styled(Pressable)`
  width: ${props => props.width || '100%'};
  height: 52px;
  border-radius: 12px;
  justify-content: center;
  align-items: ${props => props.alignItems || 'center'};
  margin-top: ${props => props.mt || '0px'};
`;

export default S;
