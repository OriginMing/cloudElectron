import styled from 'styled-components'
const StyleLi = styled.li`
 .nav-link:hover .close{
     visibility: visible;
 }
.close{
    visibility: hidden;
}
.nav-link.active .close{
    visibility: visible;
}
.unsaved-icon{
    display: inline-block;
    background-color: #d9534f;
    width: 11px;
    height: 11px;
}
.withUnSave.nav-link .close{
    display: none;
}
.withUnSave.nav-link:hover .close{
    display: inline-block;
}
.withUnSave.nav-link:hover .unsaved-icon{
  display: none;
}
`

export default StyleLi