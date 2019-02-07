export const Color = {
  gray1: '#607688',
  gray2: '#444',
  orange: '#dd4e4b',
  blue: '#3c4f5e'
}

export const TextSmall = {
  fontSize: 12,
  color: Color.gray1
}
export const TextNormal = {
  fontSize: 14,
  color: Color.gray1
}
export const TextLarge = {
  fontSize: 18,
    color: Color.gray1
}
export const TextHeader = {
  fontSize: 20,
  color: Color.gray2
}
export const TextDisplay1 = {
  fontSize: 24,
  color: Color.gray2
}
export const TextDisplay2 = {
  fontSize: 22,
  color: Color.gray2
}
export const TextLink = {
  color: Color.orange
}

export const ContainerCenter = {
  flex: 1,
  width: '100%',
  justifyContent: 'center',
  alignItems: 'center',
}
export const HorizontalView = {
  flexDirection: 'row'
}

export const userAvartar = {
  flex: 18,
  height: 70,
  justifyContent: 'center',
  alignItems: 'center',
}
export const avatarWrap = {
  shadowColor: Color.gray2,
  shadowOffset: {width: 0, height: 2},
  shadowOpacity: 0.2,
  shadowRadius: 8,
}
export const avatarImage = {
  width: 50,
  height: 50,
  borderRadius: 25,
  borderColor: '#eee',
  borderWidth: 1,
}
export const userInfo = {
  flex: 55,
  height: 70,
  justifyContent: 'center',
  paddingHorizontal: 5,
}
export const userNameText = {
  ...TextLarge,
  color: Color.blue
}
export const userInfoText = {
  ...TextSmall,
  color: Color.orange
}
export const postInfo = {
  flex: 27,
  height: 70,
  justifyContent: 'center',
}

export const postImage = {
  width: '100%',
  height: 200,
}